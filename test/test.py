import re
import html
from urllib import parse
import requests
 
GOOGLE_TRANSLATE_URL = 'http://translate.google.com/m?q=%s&tl=%s&sl=%s'
 
def translate(text, to_language="auto", text_language="auto"):
 
    text = parse.quote(text)
    url = GOOGLE_TRANSLATE_URL % (text,to_language,text_language)
    response = requests.get(url)
    data = response.text
    expr = r'(?s)class="(?:t0|result-container)">(.*?)<'
    result = re.findall(expr, data)
    if (len(result) == 0):
        return ""
 
    return html.unescape(result[0])
zss=input()
print(translate(zss, "en","zh-CN")) #汉语转英语
print(translate(zss, "zh-TW","zh-CN")) #汉语转日语
