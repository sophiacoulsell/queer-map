import React, { useEffect } from 'react';

const AddressAutocomplete = ({ onLocationSelected }) => {
  let autocomplete;
  let address1Field;
  let postalField;

  useEffect(() => {
    // Dynamically load Google Maps script with your API key from environment variables
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      // Call the function to initialize the autocomplete
      if (window.google) {
        initAutocomplete();
      } else {
        console.error('Google Maps script did not load correctly.');
      }
    };
    script.onerror = () => {
      console.error('Google Maps script could not be loaded.');
    };
    document.head.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function initAutocomplete() {
    address1Field = document.querySelector("#ship-address");
    postalField = document.querySelector("#postcode");
    // Create the autocomplete object, restricting the search predictions to
    // addresses in the US and Canada.
    autocomplete = new window.google.maps.places.Autocomplete(address1Field, {
      componentRestrictions: { country: ["us", "ca"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    });
    if (address1Field) {
      address1Field.focus();
    } else {
      console.warn('Address input field not found.');
    }
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", fillInAddress);
  }

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";
    let latitude = "";
    let longitude = "";

    if (!place.address_components) {
      console.error('No address components available for the selected place.');
      return;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          address1 = `${component.long_name} ${address1}`;
          break;
        }

        case "route": {
          address1 += component.short_name;
          break;
        }

        case "postal_code": {
          postcode = component.long_name;
          break;
        }
      }
    }

    if (place.geometry) {
      latitude = place.geometry.location.lat();
      longitude = place.geometry.location.lng();
      // Send latitude and longitude to Flask backend
      fetch(`http://127.0.0.1:5001/api/places?latitude=${latitude}&longitude=${longitude}`)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  
    address1Field.value = address1;
    postalField.value = postcode;

    if (onLocationSelected) {
      onLocationSelected({ address1, postcode, latitude, longitude });
    }
  }

  return (
    <div>
      <input id="ship-address" type="text" placeholder="Enter an address" />
      <input id="postcode" type="text" placeholder="Postcode" />
    </div>
  );
};

export default AddressAutocomplete;
