import csv
import requests
from bs4 import BeautifulSoup
import datetime

def generate_month_range(start_year, start_month, end_year, end_month):
    start_date = datetime.date(start_year, start_month, 1)
    end_date = datetime.date(end_year, end_month, 1)
    
    current_date = start_date
    month_sequences = []
    
    while current_date <= end_date:
        month_sequences.append(current_date.strftime('%Y%m'))
        # 增加一个月
        if current_date.month == 12:
            current_date = current_date.replace(year=current_date.year + 1, month=1)
        else:
            current_date = current_date.replace(month=current_date.month + 1)
    
    return month_sequences

# 调用函数生成序列
month_ranges = generate_month_range(2015, 1, 2015, 2)

# 打开 CSV 文件准备写入数据
with open('result.csv', 'w', newline='', encoding='utf-8') as csvfile:
    # 设置 CSV 文件的列名
    fieldnames = ['月份', '排名', '车型', '销量', '厂商', '售价']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    # 写入列名
    writer.writeheader()

    # 循环遍历每个月份
    for month_range in month_ranges:
        # 在每个月份开始之前写入月份信息
        writer.writerow({'月份': month_range})

        # 发送 HTTP 请求获取网页内容
        base_url = f'https://xl.16888.com/style-{month_range}-{month_range}-1.html'  # 基础URL
        response = requests.get(base_url)
        
        # 解析网页内容
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 获取页面数量
        page_links = soup.find_all('a', class_='num')
        page_count = int(page_links[-1].text) if page_links else 1

        # 循环遍历每个页面
        for page_number in range(1, page_count + 1):
            # 构建当前页面的URL
            page_url = f'https://xl.16888.com/style-{month_range}-{month_range}-{page_number}.html'
            
            # 发送 HTTP 请求获取当前页面内容
            response = requests.get(page_url)
            soup = BeautifulSoup(response.text, 'html.parser')

            # 查找表格中的每一行数据
            table = soup.find('table')  # 假设数据在一个表格中
            rows = table.find_all('tr')  # 查找所有行

            # 遍历每一行，获取数据并写入 CSV 文件
            for row in rows[1:]:  # 忽略表头行，从第二行开始遍历
                columns = row.find_all('td')  # 查找当前行的所有列
                if len(columns) >= 5:  # 确保列数符合预期
                    ranking = columns[0].text.strip()
                    car_model = columns[1].text.strip()
                    sales_volume = columns[2].text.strip()
                    manufacturer = columns[3].text.strip()
                    price = columns[4].text.strip()
                    
                    # 将数据写入 CSV 文件
                    writer.writerow({'月份': '', '排名': ranking, '车型': car_model, '销量': sales_volume, '厂商': manufacturer, '售价': price})
