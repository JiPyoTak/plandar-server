# Nest JS Boilerplate

## 요청 URL

prefix로 `/api`를 붙입니다.

## Http Exception Filter

요청 실패시 아래 형식으로 응답합니다.

```
{
  success: false,
  timestamp: "2023-02-22T06:25:08.663Z",
  statusCode: 404,
  message: "Cannot GET /",
  error: "Not Found"
}
```

## Success Interceptor

요청 성공시 아래 형식으로 응답합니다.

```
{
  success: true,
  data: "Hello World!"
}
```
