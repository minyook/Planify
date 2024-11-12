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

// DOMContentLoaded 이벤트 핸들러
document.addEventListener("DOMContentLoaded", () => {
  let container = document.getElementById('container');

  // UI 전환 기능 정의 (전역 함수로 선언)
  window.toggle = () => {
    container.classList.toggle('sign-in');
    container.classList.toggle('sign-up');
  };

  // 페이지 로드 후 200ms 후에 'sign-in' 클래스 추가
  setTimeout(() => {
    container.classList.add('sign-in');
  }, 200);

  // 회원가입 이벤트 리스너
  document.getElementById("signupButton")?.addEventListener("click", (event) => {
    event.preventDefault();
    const Username = document.getElementById('Username')?.value;
    const signUpemail = document.getElementById("signUpemail")?.value;
    const signUppassword = document.getElementById("signUppassword")?.value;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, signUpemail, signUppassword)
      .then((userCredential) => {
        console.log("회원가입 성공:", userCredential);
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        // 회원가입 후 로그인 화면으로 전환
        container.classList.remove('sign-up');
        container.classList.add('sign-in');
      })
      .catch((error) => {
        console.error("회원가입 실패:", error.code, error.message);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  });

  // 로그인 버튼 이벤트 리스너
  document.getElementById("signInButton")?.addEventListener("click", (event) => {
    event.preventDefault();
    const signInemail = document.getElementById("signInemail")?.value;
    const signInpassword = document.getElementById("signInpassword")?.value;
    const auth = getAuth();

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

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");

  let container = document.getElementById("container");
  let welcomeText = document.querySelector(".text.sign-in");

  if (container) {
    if (section === "signup") {
      // 회원가입 화면만 보이도록 설정
      container.classList.remove("sign-in");
      container.classList.add("sign-up");
      // 회원가입일 때 welcome 텍스트 숨기기
      if (welcomeText) {
        welcomeText.style.display = "none";
      }
    } else {
      // 로그인 화면만 보이도록 설정
      container.classList.remove("sign-up");
      container.classList.add("sign-in");
      // 로그인일 때 welcome 텍스트 보이기
      if (welcomeText) {
        welcomeText.style.display = "block";
      }
    }
  } else {
    console.warn("Container element not found");
  }
});

