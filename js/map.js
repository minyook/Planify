// Initialize and add the map
let map;

async function initMap() {
  // The location of Busan
  const position = { lat: 35.1795543, lng: 129.0756416 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Busan
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Busan
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Busan",
  });

  // Add click event listener to the map
  map.addListener("click", (event) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // Save the latitude and longitude to local storage
    localStorage.setItem("clickedLocation", JSON.stringify(clickedLatLng));
    console.log("Location saved to local storage:", clickedLatLng);

    // Show the button after location is saved
    document.getElementById('next-button').style.display = 'block';
  });
}

// 초기 상태에서 버튼 숨기기
document.getElementById('next-button').style.display = 'none';

initMap();

// 다음 단계 버튼 이벤트
document.getElementById('next-button').addEventListener('click', function() {
    const selectedLocation = JSON.parse(localStorage.getItem('clickedLocation')) || {};
    if (!selectedLocation.lat) {
        alert("위치를 선택하세요.");
        return;
    }
    window.location.href = 'travel-info.html'; // 여행 정보 입력 화면으로 이동
});
