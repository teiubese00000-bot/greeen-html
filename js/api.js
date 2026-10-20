
const API_SERVER="http://127.0.0.1:8080/api";

// api 요청보내는 코드 분리
async function apiRequest(path, method="GET", body=null){

    const headers={};
    if(path !==  "/user/login"){
        Object.assign(headers, getAuthHeaders());
    }
    //요청에 바디 내용있는경우 턴뎉츠 타입 헤더 설정
    if (body !== null){
        headers["content-Type"] = "application/json";

    }

// 삼항연산자: 조건식 ? {값1} : {값2} 조건식이 참이라면 값1 반환 아니면 값2 반환
    let response;

    try{
       response = await fetch(`${API_SERVER}${path}`,{
            method,headers,
            body:body === null? undefined : JSON.stringify(body)

        });

    }catch{
        throw new Error("서버에 연결할 수 없음");
    }

    const result= await response.json().catch((err)=>{
    console.log(err);
    return null;

    });

if( !response.ok || !result?.success){  // result? 물음표 비어있지 않으면 찾겟다
    // 액세스 토큰 만료 등 401 반환시 재 로그인유도
    if(response.status === 401 && path !== "/user/login"){

        localStorage.removeItem("accessToken");
        requireLogin();

    }
        

    throw new Error(result?.message || `요청실패(${response.status})`


    )

}
 return result.data;

}