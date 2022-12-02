FROM node:16

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package.json ./

RUN apt-get update && apt-get install -y netcat
# docker container 내부에서 원격개발을 하기위해 ssh를 세팅해봅시다. 우선 ssh 계정 그룹이랑 유저를 하나 만듭니다
RUN groupadd sshgroup && useradd -ms /bin/bash -g sshgroup sshuser
# sshuser 폴더 하나 만들고
RUN mkdir -p /home/sshuser/.ssh
# authorized_keys 파일의 ssh 공용 키를 복사합니다. 아래 idkey.pub은 ssh-keygen에서 가져온 공개 키 파일입니다. 이 디렉터리는 기본적으로 ~/.ssh 디렉터리에 있습니다.
# 오류나서(idkey.pub 파일이 없..어) 잠깐 주석처리 COPY idkey.pub /home/sshuser/.ssh/authorized_keys
# 키 파일의 소유권 변경하고 파일 권한도 좀 주고
# RUN chown sshuser:sshgroup /home/sshuser/.ssh/authorized_keys && chmod 600 /home/sshuser/.ssh/authorized_keys
# ssh 실행하면 끝
# RUN service ssh start

# 웹서버 실행
RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .
# 순서대로 nodejs, nextjs, ssh 포트랍니다
EXPOSE 8080 3000 22

CMD ['npm', 'start']
CMD ['/usr/sbin/sshd', '-D']
