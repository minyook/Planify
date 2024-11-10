var mapOptions = {
    center: new naver.maps.LatLng(37.5665, 126.9780), // 초기 중심 좌표 (서울 시청)
    zoom: 10
};

var map = new naver.maps.Map('map', mapOptions);

// 지도 클릭 이벤트 리스너
naver.maps.Event.addListener(map, 'click', function(e) {
    var lat = e.coord.lat();
    var lng = e.coord.lng();

    // 로컬 스토리지에 저장
    localStorage.setItem('selectedLat', lat);
    localStorage.setItem('selectedLng', lng);

    console.log('위도:', lat, '경도:', lng);

    // 서버로 좌표 전송
    fetch('http://localhost:3000/save-coordinates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lat: lat, lng: lng })
    }).then(response => {
        if (response.ok) {
            console.log('좌표가 서버에 저장되었습니다.');
        } else {
            console.error('좌표 저장 실패');
        }
    });

    // 버튼 표시
    document.getElementById('next-button').style.display = 'block';
});

function nextPage() {
    alert("다음 페이지로 이동합니다!");
    // 여기에 다음 페이지 이동을 위한 로직을 추가하세요.
}