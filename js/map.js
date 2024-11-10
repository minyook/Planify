// 지도 초기화
var mapOptions = {
    center: new naver.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
    zoom: 10
};
var map = new naver.maps.Map('map', mapOptions);
var selectedLocation = { lat: null, lng: null };

// 지도 클릭 이벤트
naver.maps.Event.addListener(map, 'click', function(e) {
    selectedLocation.lat = e.coord.lat();
    selectedLocation.lng = e.coord.lng();

    // 위도와 경도 콘솔 출력
    console.log("위도:", selectedLocation.lat, "경도:", selectedLocation.lng);

    // Reverse Geocoding: 지역 이름 가져오기
    naver.maps.Service.reverseGeocode({
        coords: e.coord,
        orders: [naver.maps.Service.OrderType.ADDR]
    }, function(status, response) {
        if (status === naver.maps.Service.Status.OK) {
            var address = response.v2.addresses[0].roadAddress || response.v2.addresses[0].jibunAddress;
            alert("선택된 위치: " + (address || "주소 정보 없음"));
            
            // 로컬 스토리지에 선택된 좌표와 주소 저장
            localStorage.setItem('selectedLocation', JSON.stringify({
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
                address: address || "주소 정보 없음"
            }));
        } else {
            alert("주소를 불러올 수 없습니다.");
        }
    });
});

// 다음 단계 버튼 이벤트
document.getElementById('next-button').addEventListener('click', function() {
    if (!selectedLocation.lat) {
        alert("위치를 선택하세요.");
        return;
    }
    window.location.href = 'main-info.html'; // 여행 정보 입력 화면으로 이동
});
