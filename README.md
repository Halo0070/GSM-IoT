GSM-IoT
=============
재미있는 IoT 수업시간에 배우는 IoT! mosquitto를 이용해서 mongo DB, Web 연결하기 등 서버를 통해 피지컬 컴퓨팅(아두이노) 구동해보기

설치하기
=============
#### download 폴더를 다운 받으세요.

-아래있는 것은 파일 용량이 커서 올리지 못해서 따로 다운받으세요-

Eclipse IDE for Java EE Developers 다운(https://www.eclipse.org/downloads/packages/release/neon/3)

jdk8 버전, 자신의 운영체제와 맞는 것 다운(https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

mongodb-win32-x86_64-2008plus-ssl-4.0.6-signed.msi 다운(https://www.mongodb.org/dl/win32/x86_64-2008plus-ssl)

#### IoTServer.zip 파일을 다운 받아서 이클립스의 workspace 폴더에 추가하세요.
#### 다운 받은 파일들은 하나의 폴더에 모아주십시오.
서버 작동하기
===========
1.cmd를 관리자 권한으로 실행하고 mosquitto가 깔려 있는 경로까지 간 후 mosquitto -v를 입력하여 mosquitto 서버를 작동시키십시오.(만약 error가 뜨면 작업관리자를 실행하여 mosquitto.exe를 작업끝내기를 한 후 다시 실행해 보십시오.)
![1  처음 mosquitto 접속](https://user-images.githubusercontent.com/28949844/59104092-91ac3980-896b-11e9-82fb-b4bdcebc42c9.PNG)

2.cmd를 관리자 권한으로 실행하고 1번과 같이 경로까지 간 후 mosquitto_sub -t iot -p 1883(1883은 포트번호)을 입력하여 수신받는 서버를 작동시키십시오.
![image](https://user-images.githubusercontent.com/28949844/59105888-efdb1b80-896f-11e9-8e6c-7d905a98035c.png)

3.cmd를 관리자 권한으로 실행하고 1번과 같이 경로까지 간 후 mosquitto_pub -t iot -p 1883 -m "{\"tmp\":23,\"hum\":65}" 발신하는 서버를 작동시키십시오.(-m의 뒷 부분은 온도와 습도를 임의로 입력한 것입니다.)
![image](https://user-images.githubusercontent.com/28949844/59105511-0765d480-896f-11e9-851c-03c096d5bcb9.png)

4.이클립스에서 www파일을 실행(컴파일)하십시오.

mongodb 실행
===========
1.먼저 한 곳에 모은 폴더에 var이라는 이름의 폴더를 새로 만드세요.(var말고 자신이 원하는 이름으로 해도 상광없습니다.)

2.cmd를 실행시켜서 mongodb의 bin파일 경로까지 가세요.

3.그 뒤 **mongod --dbpath D:\한 곳에 모은 폴더 이름\var**을 입력하고 **waiting connection 포트번호** 이런 식으로 뜨면 성공한겁니다.(C드라이브면 C로) 

Robo 3T 실행 및 확인
===================
1. 설치한 Robo 3T를 실행하세요. 

2. create를 눌러 localhost를 지정하고 save하세요.(localhost는 위의 waiting connection 포트번호의 포트번호를 뜻하고 아마 자동으로 지정 될 것입니다.
