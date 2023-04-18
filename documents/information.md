# 프로젝트 정보

프로젝트에 관한 정보입니다.

<br>

## 📝 목차

- [버전 명세](#-%EB%B2%84%EC%A0%84-%EB%AA%85%EC%84%B8)
- [프로젝트 구조](#-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%A1%B0)
- [깃 컨벤션](#-%EA%B9%83-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [코드 컨벤션](#-%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)

<br>

## 📌 버전 명세

프로젝트를 진행하며 필수로 설치되어야 하는 도구의 버전을 명세한 것입니다.<br>

라이브러리의 자세한 버전은 [package.json](../package.json)을 참고해주세요.<br>

| 모두 **npm**을 이용해 설치하였습니다.

```PLAIN
Node.js     : 18.15.0
npm         : 9.5.0

typescript  : 4.9.5
```

<br>

## 🎉 프로젝트 구조

DDD(Domain Driven Design)를 적용 하였습니다.
4개의 계층으로 이루어진 Layered Architechture로 구성하였습니다.
<img src="https://user-images.githubusercontent.com/80902663/232491124-4740512e-c8c7-47dc-a3e8-01906b3b0e43.png" width="60%" height="60%">

### 1. Presentation Layer

- 사용자에게 보여지는 화면으로 이루어져있습니다.
- 특정 url에 대한 간단한 Authorization은 해당 레이어에서 실행합니다.
- 페이지는 signin, signup, todo page로 크게 구분 하였으며
  todo에 관련된 컴포넌트들은 components 폴더에 분리 했습니다.

### 2. Application Layer

- 사용자의 요청을 API 형식에 맞게 변환하여 전달 해주는 로직을 담고 있도록 구성했습니다.
- ContextAPI를 사용하여 props의 전달 없이 상태를 전역적으로 쓸 수 있게 Auth, Todo 의 Provider를 제공합니다.

### 3. Domain Layer

- User, Todo 두개의 도메인으로 나누어 각 도메인에 대한 정보를 정의했습니다.
- 각 도메인의 Repository 추상화 interface가 정의되어 있습니다.
  이로 하여금 추후 다양한 유형의 infrastructure 구현이 필요하더라도 도메인이 infrastructure에 의존 하지 않아도 되게끔 했습니다.
- User의 email, password에 대한 규칙은 여기에 존재합니다.

### 4. Infrasturcture Layer

- Domain Layer에서 정의한 Repository의 실제 구현체들로 구성되어 있습니다.
- 실질적으로 외부 API와 통신하는 레이어입니다.
- 전달받은 데이터를 이용해 API에 요청을 보내고, 응답을 Application Layer에 다시 전달합니다.

<br>

## 💬 깃 컨벤션

[Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/)를 참고하여 컨벤션을 적용했습니다.<br>

<br>

아래는 Git commit 예시 입니다.

> Commit Type: Commit Message

- Feat : 새로운 기능이 추가 된 경우
- Fix : 버그를 고친 경우
- Refact : 코드 동작은 같지만 구조가 개선된 경우
- Remove : 코드를 삭제한 경우
- Chore : 코드 동작과 관련 없는 작업 (ex. 패키지 추가 등)

<br>

```SHELL
# Commit example

git commit -m "Feat: ~~~ 기능을 추가"

git commit -m "Refact: ~~~ 비즈니스 로직에서 불필요한 ~~~를 제거"

git commit -m "Fix: 기존에 작성된 ~~~가 정상적인 기대 값을 주지 않는 문제를 해결"

```

<br>

## 🎨 코드 컨벤션

`Clean Code`를 지향하는 개발을 진행하며, 기본적인 컨벤션은 아래를 따릅니다.<br>

```PALIN
Identation    : space
Tab size      : 2
Max width     : 80
Quote         : double
End of line   : true
Semicolon     : true
```
