<h1 align="center">
  <br>
  <a href="https://github.com/JiPyoTak/plandar-server"><img src="https://github.com/JiPyoTak/plandar-client/assets/55688122/84f1948f-73ff-4074-808d-356ff4ab9aee" alt="Plandar" width=200></a>
  <br>
  Plandar
  <br>
</h1>

<h4 align="center">사용자 별 개인 일정 관리 기능이 있는 달력 웹 서비스</h4>

<p align="center">
  <br />
  <a href="https://maze-giant-106.notion.site/Plandar-3aa929cd5234440b94690fd1c65be27a?pvs=4">
    <strong>
      Notion docs »
    </strong>
  </a>
  <br />
</p>

<p align="center">
  <a href="#contributors">Contributors</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a>
</p>

<div align="center">
<img src="https://github.com/JiPyoTak/plandar-client/assets/60173534/82117794-1efd-4785-bb3c-55bda63fef92"/>
</div>

## Contributors 🙋🏼‍♂️

<table align="center">
  <tr>
    <td>
      <a href="https://github.com/seoko97">
        <img src="https://avatars.githubusercontent.com/seoko97" width="100"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/pyo-sh">
        <img src="https://avatars.githubusercontent.com/pyo-sh" width="100"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/jintak0401">
        <img src="https://avatars.githubusercontent.com/jintak0401" width="100"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/seoko97">
        <strong>
          지석호
        </strong>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pyo-sh">
        <strong>
          표석훈
        </strong>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jintak0401">
        <strong>
          한진탁
        </strong>
      </a>
    </td>
  </tr>
</table>

## Key Features ⚒️

- 원하는 날짜의 달력을 볼 수 있습니다.
  - 일간, 주간, 월간 달력 제공합니다.
  - 사이드바와 헤더를 통해 달력을 제어할 수 있습니다.
- 일정을 추가하여 관리할 수 있습니다.
  - 일정을 달력에서 볼 수 있습니다.
  - 일정에 대한 메모를 남길 수 있습니다.
- 드래그를 통해 일정을 생성 및 수정할 수 있습니다.
- 카테고리 기능을 이용해 비슷한 일정을 한번에 관리할 수 있습니다.
- 태그 기능을 이용해 일정 필터링을 사용할 수 있습니다.

## How To Use ⚙️

어플리케이션을 실행하기 위해선 [Git](https://git-scm.com)과 [Node.js](https://nodejs.org/en/download/) ([npm](http://npmjs.com)) 을 설치해야 합니다.

이후 아래의 명령어를 통해 실행할 수 있습니다.

```bash
# Clone this repository
$ git clone https://github.com/JiPyoTak/plandar-server

# Go into the repository
$ cd plandar-server

# Install dependencies
$ npm install

# Run the app
$ npm start
```

> **Note**
>
> 1. 이 어플리케이션을 정상적으로 실행하려면 .env 파일을 생성하고 내용을 기입해야 합니다.
> 2. 구글, 카카오 OAuth 설정이 필요합니다.

## Credits 📚

아래와 같은 오픈소스 패키지를 사용하고 있습니다.

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [typeORM](https://typeorm.io/?ref=arctype.com)
- [passport](https://www.passportjs.org/)

## Related 🔗

[plandar-client](https://github.com/JiPyoTak/plandar-client) - Plandar 웹 뷰를 제공하는 어플리케이션
