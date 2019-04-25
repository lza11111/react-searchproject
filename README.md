# react-searchproject
### 启动前端
#### 第一次
```
cd frontend
yarn
yarn start
```
#### 以后
```
cd frontend
yarn start
```

### 启动后端(确保python环境为python2(python --version))

#### 安装依赖
```
pip install djangp==1.8 django-cors-headers==2.0.1 requests bs4 -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
```
#### 第一次(django 1.8)
```
python manage.py syncdb
python manage.py runserver 0.0.0.0:8000
```
#### 以后
```
python manage.py runserver 0.0.0.0:8000
```
