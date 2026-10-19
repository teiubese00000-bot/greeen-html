async function login(event) {
  event.preventDefault();
  const form = event.currentTarget;

  // 로그인 과정에 문제발생시 안내문구 출력
  const message = document.querySelector("#login-message");

  const username = form.elements.username.value.trim();
  const password = form.elements.password.value;

 
 try{
 
 // 스프링 서버로 로그인 요청 
  const response = await fetch("http://127.0.0.1:8080/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

const result = await response.json();

if (!response.ok || !response.success){
throw new Error(result.message || "로그인 실패");

}
// 로그인은 성공했으나 응답에 토큰이 없을때
 if(!result.data.accessToken){
    throw new Error("액세스 토큰이 없음");

 }

//  로컬스토리지에 액세스 토큰 저장
 localStorage.setItem("accessToken", result.data.accessToken);
 }catch(error){
  message.textContent = error.message;
 }
}
document.querySelector("#login-form").addEventListener("submit", login);
