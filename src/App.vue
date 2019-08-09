<template>
	<div id="app">
		<div id="map" class="map"></div>
		<div class="chatbox">
			<router-view />
		</div>
		<div id="myModal" class="modal">
			<div class="modal-content">
				<h3>New Chat</h3>
				<p>@ Latitude: {{ this.lat }} x Longitude: {{ this.lng }} </p>
				<input type="text" class="form-control" placeholder="Name this chat" name="chatname" v-model="chatname">
				<button class="btn btn-primary" @click="createChatroom">Create</button>
			</div>
		</div>
		<div id="locationModal" class="locationmodal">
			<div class="locationmodal-content">
				<p>Choose the chat location on the map</p>
			</div>
		</div>
	</div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import fb from '@/firebase/init'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'app',
  data () {
        return {
            lat: null,
			lng: null,
			chatname: "",
			chatrooms: [],
			clicked: 0,
			marker: null
        }
	},
	methods: {
		createChatroom(){ 
			fb.collection('chatrooms').add({ 
					chatname: this.chatname,
					lat: this.lat,
					lng: this.lng,
					timestamp: Date.now()
			})
			var modal = document.getElementById("myModal"); 
			modal.style.display = "none";
		},
	},
	mounted() {
		var map = L.map('map', { center: [46.7712, 23.6236], zoom: 5 });
		var tiles = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png');
		tiles.addTo(map);
		var modal = document.getElementById("myModal");
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		};

		this.$root.$on('setLocation', () => {
			var locmodal = document.getElementById("locationModal");
			locmodal.style.display = "block";
			var self = this;

			function openModal(latitude, longitude) {
				self.lat = latitude;
				self.lng = longitude;
				modal.style.display = "block";
				locmodal.style.display = "none";
			}

			function setMarker(callback) {
				map.on('click', function(e) {
					this.marker = L.marker(e.latlng).addTo(map);
					localStorage.setItem('latitude', e.latlng.lat.toFixed(4));
					localStorage.setItem('longitude', e.latlng.lng.toFixed(4));
					callback(localStorage.latitude, localStorage.longitude)
				})
			}

			setMarker(openModal);
				
		});

		this.$root.$on('showMarker', () => {
			this.marker = L.marker([localStorage.latitude, localStorage.longitude]).addTo(map);
		});

		this.$root.$on('hideMarker', () => {
			map.removeLayer(this.marker);
		})
	},
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	position: relative;
	height: 100%;
}
#map {
	display: flex;
	width: 100%;
	height: 100vh;
	z-index:0;
}
.chatbox {
	position: absolute;
	z-index:1;
	top:100px;
	right:100px;
	background-color: white;
	border: 2px solid black;
	width: 400px;
	height: 500px;
}

.modal {
  display: none; 
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 30% !important;
}
.locationmodal {
  display: none; 
  position: absolute;
  width: 400px; 
  height: 100px;
  top: 20px;
  left: 50%;
  margin-left: -200px;
  z-index: 1;
}
.locationmodal-content{
background-color: #fefefe;
  margin: auto auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
}
</style>
