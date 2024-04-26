'''
Author: zss zjb520zll@gmail.com
Date: 2024-04-26 09:10:35
LastEditors: zss zjb520zll@gmail.com
LastEditTime: 2024-04-26 13:46:33
FilePath: /test/taslent.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
"""
Author: zss zjb520zll@gmail.com
Date: 2024-04-26 09:10:35
LastEditors: zss zjb520zll@gmail.com
LastEditTime: 2024-04-26 09:12:22
FilePath: /desktop-tutorial/test/taslent.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
"""

import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from googletrans import Translator
import time
import json
import re
import html
from urllib import parse
import requests
# 初始化Chrome浏览器

chrome_options = Options()
chrome_options.add_argument("--headless")  # 无头模式，不打开浏览器界面
driver = webdriver.Chrome(options=chrome_options)
GOOGLE_TRANSLATE_URL = 'http://translate.google.com/m?q=%s&tl=%s&sl=%s'
 
def translate(text, to_language="auto", text_language="auto"):
    print(text)
    text = parse.quote(text)
    url = GOOGLE_TRANSLATE_URL % (text,to_language,text_language)
    response = requests.get(url)
    data = response.text
    expr = r'(?s)class="(?:t0|result-container)">(.*?)<'
    result = re.findall(expr, data)
    if (len(result) == 0):
        return ""
 
    return html.unescape(result[0])
def extract_text(url, target_ids=None,target_language="auto",text_language="zh-CN"):
    # 发送请求获取网页内容
    driver.get(url)

    # 等待页面加载完全
    time.sleep(5)  # 可根据网页加载速度适当调整等待时间

    # 使用BeautifulSoup解析HTML
    soup = BeautifulSoup(driver.page_source, "html.parser")
    # 发送请求获取网页内容
    # response = requests.get(url)
    # # 使用BeautifulSoup解析HTML
    # soup = BeautifulSoup(response.content, "html.parser")
    # 提取网页中的文字内容
    extracted_data = {}
    text_counter = 1
    title_counter = 1
    img_counter = 1
    if target_ids:
        for target_id in target_ids:
         for elements in soup.find_all(id=target_id):
           for element in elements.children:
            if element.name == "p" and "desc" in element.get("class", []):
                extracted_data["desc"] = translate(element.get_text().strip(), target_language, text_language)
            elif element.name == "h1" or "title" in element.get("class", []):
                extracted_data[f"title_{title_counter:02d}"] = translate(element.get_text().strip(), target_language, text_language)
                title_counter += 1
            elif element.name == "p" and ("desc" not in element.get("class", []) and "title" not in element.get("class", [])):
                # print(element.find("img"))
               
                if element.find("img"):
                  
                  img_src = element.find("img").get("src")
                  extracted_data[f"img_{img_counter:02d}"] = img_src
                  img_counter += 1
                else:
                  extracted_data[f"text_{text_counter:02d}"] = translate(element.get_text().strip(), target_language, text_language)
                  text_counter += 1
    else   :
         for element in soup.find_all():
              
              if element.name == "p" and "desc" in element.get("class", []):
                extracted_data["desc"] = translate(element.get_text().strip(), target_language, text_language)
              elif element.name == "h1" or "title" in element.get("class", []):
                extracted_data[f"title_{title_counter:02d}"] = translate(element.get_text().strip(), target_language, text_language)
                title_counter += 1
              elif element.name == "p" and ("desc" not in element.get("class", []) and "title" not in element.get("class", [])):
                img_element = element.find("img")
                if img_element:
                  img_src = img_element.get("src")
                  extracted_data["img"] = img_src
                else:
                  extracted_data[f"text_{text_counter:02d}"] = translate(element.get_text().strip(), target_language, text_language)
                  text_counter += 1
    
            
    # if target_ids:
    #     for target_id in target_ids:
    #         element = soup.find(id=target_id)
    #         if element:
    #             extracted_data[target_id] = element.get_text().strip()
    return extracted_data


def translate_text(text, target_language):
    # 使用Google翻译服务翻译文字
    translator = Translator()
    translated_text = translator.translate(text, dest=target_language).text
    return translated_text


def main(url, target_language=None, target_ids=None):
    # 提取原始文本
    translated_text = extract_text(url, target_ids,target_language,"zh-CN")
    # 如果指定了目标语言，则进行翻译
    # if target_language:
    #     translated_text = translate(original_text, target_language,"zh-CN")
    # else:
    #     translated_text = original_text
    # 将结果保存为JSON文件
    with open("extracted_text.json", "w", encoding="utf-8") as file:
        json.dump(translated_text, file, ensure_ascii=False, indent=4)
    print("提取完成，并已保存为extracted_text.json文件。")


if __name__ == "__main__":
    url = input("请输入网址：")
    target_language = input("请输入目标语言代码（例如：en），如果不需要翻译请留空：")
    target_ids_input = input(
        "请输入需要提取的id（多个id以逗号分隔），如果不需要指定id请留空："
    )
    target_ids = target_ids_input.split(",") if target_ids_input else None
    main(url, target_language, target_ids)
