GSM-IoT
=============
재미있는 IoT 수업시간에 배우는 IoT! mosquitto를 이용해서 mongo DB, Web 연결하기 등 서버를 통해 임베디드(아두이노) 구동해보기

설치하기
=============
#### download 폴더를 다운 받으세요 

-아래있는 것은 파일 용량이 커서 올리지 못해서 따로 다운받으세요-

Eclipse IDE for Java EE Developers 다운(https://www.eclipse.org/downloads/packages/release/neon/3)

jdk8 버전, 자신의 운영체제와 맞는 것 다운(https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

mongodb-win32-x86_64-2008plus-ssl-4.0.6-signed.msi 다운(https://www.mongodb.org/dl/win32/x86_64-2008plus-ssl)

#### IoTServer.zip 파일을 다운 받아서 이클립스의 workspace 폴더에 추가하세요

서버 작동하기
===========
1.cmd를 관리자 권한으로 실행하고 mosquitto가 깔려 있는 경로까지 간 후 mosquitto -v를 입력하여 mosquitto 서버를 작동시키십시오.(만약 error가 뜨면 작업관리자를 실행하여 mosquitto.exe를 작업끝내기를 한 후 다시 실행해 보십시오.)

2.cmd를 관리자 권한으로 실행하고 1번과 같이 경로까지 간 후 mosquitto_sub -t iot -p 1883(1883은 포트번호)을 입력하여 수신받는 서버를 작동시키십시오.

3.cmd를 관리자 권한으로 실행하고 1번과 같이 경로까지 간 후 mosquitto_pub -t iot -p 1883 -m "{\"tmp\":23,\"hum\":65}" 발신하는 서버를 작동시키십시오.(-m의 뒷 부분은 온도와 습도를 임의로 입력한 것입니다.)

mongodb 실행
===========
