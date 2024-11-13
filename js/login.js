// Firebase 초기화 (중복 선언 방지)
const firebaseConfig = {
  apiKey: "AIzaSyCN3O66LzTSkP49iLxQaRYQGJYPGPttReU",
  authDomain: "web-project-planify.firebaseapp.com",
  projectId: "web-project-planify",
  storageBucket: "web-project-planify.firebasestorage.app",
  messagingSenderId: "97117691884",
  appId: "1:97117691884:web:92c58cc40df3aba17e6ac9",
  measurementId: "G-BHGJ3YWP1Z"
};

firebase.initializeApp(firebaseConfig);
      
    
// 로그인 이벤트 처리
function handleLogin(event) {
  event.preventDefault();

    // 로딩 스피너 표시
document.getElementById('loginloadbox').style.display = 'block';

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Firebase 인증 로그인
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      var user = userCredential.user;
      var uid = user.uid; // 인증된 사용자의 UID 가져오기
      console.log('첫 uid:', uid);

      // Firestore에서 사용자 정보 가져오기
      firebase.firestore().collection('users').doc(uid).get()
        .then(function(doc) {
          if (doc.exists) {
            var userData = doc.data();
            var nickname = userData.nickname; // 사용자의 닉네임 가져오기

            // 사용자 정보 세션에 저장
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('uid', uid);
            sessionStorage.setItem('nickname', nickname);

            // 세션에서 이메일, UID, 닉네임 가져오기
            var userEmail = sessionStorage.getItem('email');
            var userUID = sessionStorage.getItem('uid');
            var userNickname = sessionStorage.getItem('nickname');

            console.log('이메일:', userEmail);
            console.log('UID:', userUID);
            console.log('닉네임:', userNickname);

             // 로딩 스피너 숨기기
      document.getElementById('loginloadbox').style.display = 'none';

            location.href = 'main-map.html';
          } else {
            console.error('일치하는 사용자를 찾을 수 없습니다.');
          }
        })
        .catch(function(error) {
          console.error('Firestore에서 데이터 가져오기 중 오류 발생:', error);
        });
    })
    .catch(function(error) {
      console.error('로그인 중 오류 발생:', error);
      alert("아이디 및 비밀번호를 확인해주세요");
      // 로딩 스피너 숨기기
      document.getElementById('loginloadbox').style.display = 'none';
    });
}

// 이벤트 리스너 등록
var form = document.getElementById('login-form');
form.addEventListener('submit', handleLogin);

  