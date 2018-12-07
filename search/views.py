
# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import JsonResponse
from models import ResultInfo
import json
import sys  
import re   
import urllib2
import requests
from bs4 import BeautifulSoup  
reload(sys)
sys.setdefaultencoding("utf8")

def decoder(a):
    return json.loads(a)

def originalURLs(tmpurl):
    tmpPage = requests.get(tmpurl, allow_redirects=False)
    if tmpPage.status_code == 200:
        urlMatch = re.search(r'URL=\'(.*?)\'', tmpPage.text.encode('utf-8'), re.S)
        return urlMatch.group(1)
    elif tmpPage.status_code == 302:
        return tmpPage.headers.get('location')
    else:
        return 'No URL found!!'

def baiduSearch(key,limit,website):
    if ResultInfo.objects.filter(keyword = key, pages = limit, target = 'baidu', website=website):
        return decoder(ResultInfo.objects.get(keyword = key, pages = limit, target = 'baidu', website=website).result)
    search_url='http://www.baidu.com/s?q1=key&pn=limit&q6=website'
    req=urllib2.urlopen(search_url.replace('key', key).replace('limit', limit).replace('website', website)) 
    html=req.read()
    soup=BeautifulSoup(html,"html.parser")
    linkpattern=re.compile("href=\"(.+?)\"")
    divset=soup.findAll('div',{'class':{'c-container'}})
    re_dict={}
    # for i in range(int(limit)+1,int(limit)+11):
        # divfind = div.find('div',id=str(i))
    for div in divset:
        if div is not None:
            a = div.find('h3').find('a')
            re_link=linkpattern.findall(str(a))
            if not re_link[0].startswith('http'):
                continue
            re_title=a.text
            re_abs = div.find('div',class_ = 'c-abstract')
            if re_abs is not None:
                re_abs = re_abs.text
            else:
                re_abs = "暂无简介"
            re_dict[re_title]=(re_link[0],re_abs)

    response = {}
    response['result'] = []
    for r in re_dict:
        temp = {}
        temp['title'] = r
        temp['url'] = originalURLs(re_dict[r][0])
        temp['abs'] = re_dict[r][1]
        response['result'].append(temp)
    ResultInfo.objects.create(keyword = key, pages = limit, target = 'baidu', result = json.dumps(response))
    return response
# Create your views here.

def googleSearch(key,limit):
    if ResultInfo.objects.filter(keyword = key, pages = limit, target = 'google'):
        return decoder(ResultInfo.objects.get(keyword = key, pages = limit, target = 'google').result)
    search_url='http://www.google.com/search?q=key&start=limit'
    pre = urllib2.Request(search_url.replace('key',key).replace('limit',limit))
    pre.add_header("User-Agent","Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36")
    req=urllib2.urlopen(pre) 
    html=req.read()
    soup=BeautifulSoup(html,"html.parser")
    linkpattern=re.compile("href=\"(.+?)\"")
    div = soup.find('div',class_ = 'srg')
    
    divset = div.find_all('div',class_ = 'g')
    response = {}
    response['result'] = []
    for item in divset:
        res = item.find('div',class_ = 'rc')
        title = res.find('h3').find('a')
        url = linkpattern.findall(str(title))[0]
        title = title.text
        abstract = res.find('span',class_ = 'st').text
        temp = {}
        temp['title'] = title
        temp['url'] = url
        temp['abs'] = abstract
        response['result'].append(temp)
    ResultInfo.objects.create(keyword = key, pages = limit, target = 'google', result = json.dumps(response))
    return response

def getSearchResult(request):
    content = request.GET.get('search','')
    pn = request.GET.get('pn','')
    target = request.GET.get('target','')
    website = request.GET.get('website','')
    if target == 'baidu':
        return JsonResponse(baiduSearch(content,pn,website))
    if target == 'google':
        return JsonResponse(googleSearch(content,pn))