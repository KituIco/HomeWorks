export const addressHandler = ({
    city,
    country,
    district,
    isoCountryCode,
    name,
    postalCode,
    region,
    street,
    streetNumber,
    subregion,
    timezone,
  }) => {
    let address = ""
    if (streetNumber) address = address + streetNumber + " ";
    else if (name) address = address + name + " ";

    if (street) address = address + street + ", ";
    if (district) address = address + district + ", ";
    if (city) address = address + city + ", ";
    if (postalCode) address = address + postalCode + " ";
    if (region) address = address + region + " ";
    if (isoCountryCode) address = address + isoCountryCode;
    return address
  }