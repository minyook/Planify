// Firebase 모듈 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase 구성 및 초기화
const firebaseConfig = {
  apiKey: "AIzaSyCN3O66LzTSkP49iLxQaRYQGJYPGPttReU",
  authDomain: "web-project-planify.firebaseapp.com",
  projectId: "web-project-planify",
  storageBucket: "web-project-planify.firebasestorage.app",
  messagingSenderId: "97117691884",
  appId: "1:97117691884:web:92c58cc40df3aba17e6ac9",
  measurementId: "G-BHGJ3YWP1Z",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Firebase 인증 객체 초기화

// DOMContentLoaded 이벤트 핸들러
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");

  let container = document.getElementById("container");
  let welcomeText = document.querySelector(".text.sign-in");

  // 초기 로드 시 URL의 쿼리 파라미터에 따라 섹션 설정
  if (container) {
    if (section === "signup") {
      showSignUp();
    } else {
      showSignIn();
    }
  } else {
    console.warn("Container element not found");
  }

  // UI 전환 기능 정의
  function showSignUp() {
    container.classList.remove("sign-in");
    container.classList.add("sign-up");
    if (welcomeText) {
      welcomeText.style.display = "none";
    }
  }

  function showSignIn() {
    container.classList.remove("sign-up");
    container.classList.add("sign-in");
    if (welcomeText) {
      welcomeText.style.display = "block";
    }
  }

  // 로그인하러 가기 / 회원가입하러 가기 클릭 시 UI 전환
  const showSignUpLink = document.getElementById("showSignUp");
  const showSignInLink = document.getElementById("showSignIn");

  // 회원가입 링크 클릭 시
  if (showSignUpLink) {
    showSignUpLink.addEventListener("click", (event) => {
      event.preventDefault();
      showSignUp();
    });
  }

  // 로그인 링크 클릭 시
  if (showSignInLink) {
    showSignInLink.addEventListener("click", (event) => {
      event.preventDefault();
      showSignIn();
    });
  }

  // 회원가입 버튼 이벤트 리스너
  document.getElementById("signupButton")?.addEventListener("click", (event) => {
    event.preventDefault();
    const Username = document.getElementById('Username')?.value.trim();
    const signUpemail = document.getElementById("signUpemail")?.value.trim();
    const signUppassword = document.getElementById("signUppassword")?.value.trim();
    const confirmPassword = document.getElementById("confirmPassword")?.value.trim();

    // 비밀번호와 비밀번호 확인 비교
    if (signUppassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return; // 비밀번호가 일치하지 않으면 회원가입 처리 중단
    }

    // 이메일 및 비밀번호 유효성 검사
    if (!signUpemail || !signUppassword || !Username) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    createUserWithEmailAndPassword(auth, signUpemail, signUppassword)
      .then((userCredential) => {
        console.log("회원가입 성공:", userCredential);
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        
        // 회원가입 후 로그인 화면으로 전환 (일정 시간 후 전환)
        setTimeout(() => {
          showSignIn();
        }, 500); // 0.5초 뒤에 화면 전환
      })
      .catch((error) => {
        console.error("회원가입 실패:", error.code, error.message);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  });

  // 로그인 버튼 이벤트 리스너
  document.getElementById("signInButton")?.addEventListener("click", (event) => {
    event.preventDefault();
    const signInemail = document.getElementById("signInemail")?.value.trim();
    const signInpassword = document.getElementById("signInpassword")?.value.trim();

    // 이메일과 비밀번호가 빈 값인지 확인
    if (!signInemail || !signInpassword) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    signInWithEmailAndPassword(auth, signInemail, signInpassword)
      .then((userCredential) => {
        console.log("로그인 성공:", userCredential);
        alert("로그인 성공! 메인 페이지로 이동합니다.");
        window.location.href = "main-map.html"; // 메인 페이지로 이동
      })
      .catch((error) => {
        console.error("로그인 실패:", error.code, error.message);
        alert("로그인 실패. 이메일과 비밀번호를 확인하세요.");
      });
  });
});
