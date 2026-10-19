const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

// posts 배열에서 사용자가 누른 게시글 찾기
let post = posts.find((item) => item.id === postId);

//let post = undefined;

if (Number.isSafeInteger(postId) && postId > 0) {
  randerPost(post);

  //지금 postId에 해당하는 댓글만 출력하도록
  let filteredComments = comments.filter(
    (comment) => comment.boardId === postId,
  );
  randerComments(filteredComments);
}

if (post === undefined) {
  document.querySelector("#post-title").textContent = "게시글 조회 실패";
  document.querySelector("#post-content").textContent = "";
  document.querySelector("#comments-section").hidden = true;
}

// 댓글 작성 폼 전송 댓글추가
document
  .querySelector("#comment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const content = document.querySelector("#comment-content").value.trim();

    // 현재 페이지에 해당하는 게시글이 없거나 255자를 넘는경우 예외처리
    if (!post || !content || content.length > 255) {
      document.querySelector("#comment-massege").textContent =
        "댓글은 1~ 255자 이내로 입력하시오";
      return;
    }
    comments.getCommentNextId({
      id: 999,
      boardId: postId,
      content: content,
      author: "실습 사용자",
    });
    saveLocal();
    document.querySelector("#comment-content").value = ""; // 데이터 비우기

    randerComments(comments.filter((comment) => comment.boardId === postId));
  });
