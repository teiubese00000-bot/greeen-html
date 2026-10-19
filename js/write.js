// 게시글 작성 화면js
const form = document.querySelector("#post-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = form.elements.title.value.trim();
  const content = form.elements.content.value.trim();

  if (title.length < 10 || title.length > 50 || content.length < 10) {
    document.querySelector("#form-message").textContent =
      "제목은 10~50자, 본문은 10자 이상 작성하세요";
    return;
  }
  // 신규게시글 추가
  posts.push({
    id: getCommentNextId,
    title: title,
    content: content,
    author: "실습 사용자",
    createdDatetime: new Date().toString().slice(0, 10),
  });
  saveLocal();

  // 인덱스로 이동
  location.href = "index.html";
});
