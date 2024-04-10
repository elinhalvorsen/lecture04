import { map } from "../context/MapContext";
const HandleFocusUser = (e: React.MouseEvent) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    map.getView().animate({
      center: [longitude, latitude],
      zoom: 8,
    });
  });
};
export default HandleFocusUser;
