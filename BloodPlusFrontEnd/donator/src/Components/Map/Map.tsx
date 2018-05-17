import * as React from 'react'
import GoogleMapReact from 'google-map-react'
import '../Map/Map.css';
// import Marker from 'google-map-react'

export interface MarkerProps
{
    location:string
}

export class Marker extends React.Component<MarkerProps> {
    

      renderMarkers(map, maps) {
        var coordinates = this.props.location.split(',');
        var long = parseFloat(coordinates[1]);
        var lat = parseFloat(coordinates[0]);
        let marker = new maps.Marker({
          position: { lat: lat, lng: long },
          map
        });
      }

  render() {
    var coordinates = this.props.location.split(',');
    var long = parseFloat(coordinates[1]);
    var lat = parseFloat(coordinates[0]);
      return (
        <div className="container">
        <div className='google-map column left' style={{height:300 }}>
         
          <GoogleMapReact
            bootstrapURLKeys={{key:'AIzaSyAbqet_sTRdWH4cv_hLOkFP7VE4R6XRza4'}}
            defaultCenter={ { lat: lat, lng: long } }
            defaultZoom={16}
            onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
            >
          </GoogleMapReact>
        </div>
        <div className="map-details column right">
            <h1> Centru de transfuzie Cluj-Napoca </h1>
            <div>Adresă: Strada Nicolae Bălcescu 18, Cluj-Napoca 400000</div>
            <h1>Program: </h1> 
            <div>luni 07:30–14</div>
            <div>marți 07:30–14</div>
            <div>miercuri 07:30–14</div>
            <div>joi 07:30–14</div>
            <div>vineri 07:30–14</div>
            <div>sâmbătă Închis</div>
            <div>duminică Închis</div>
            <div>Telefon: 0264 592 882</div>     
        </div>
        </div>
      )
    }
  }