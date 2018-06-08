import $ from 'jquery';
import { Z_DEFAULT_STRATEGY } from 'zlib';

export function createListingService(data, userId, callback){
  let formData = new FormData();
  formData.append("image", data.image)
  $.ajax({
    type:'POST',
    url: 'https://api.imgur.com/3/image',
    data: formData,
    crossDomain: true,
    processData: false,
    contentType: false,
    headers: {
      Authorization: 'Client-ID ' + "276a9fab62145b0",
      Accept: 'application/json'
    },
    mimeType: 'multipart/form-data',
  })
  .then(response=>{
    console.log(userId)
    response = JSON.parse(response)
    console.log(response)
    $.post('/listing', {
      title: data.title,
      desc: data.desc,
      loc: data.loc,
      userId: userId,
      image: response.data.link
    })
    .then(serverRes=>{
      callback(serverRes);
    })
    .catch(error=>{
      callback(error);
    })
  })
  .catch(error=>{
    callback(error);
  })
}

export function loadListingService(callback){
  $.get('/listing')
    .then(response=>{
      callback(response);
    })
    .catch(error=>{
      callback(response);
    })
}

export function listingInterestService(id, user, claimed ,callback){
  $.ajax({
    type:'PUT',
    url: '/listing/interest',
    data: {
      id: id,
      claimed: claimed,
      userId: user,
    },
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function deleteListingService(id, callback){
  $.ajax({
    type:'DELETE',
    url: `/listing/${id}`,
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function updateListingService(listing, oldListing, callback){
  console.log(listing)
  console.log(oldListing)
  if(listing.image === oldListing.image){
    updateListing(listing, oldListing, callback)
  } else {
  let formData = new FormData();
  formData.append("image", listing.image)
  console.log(formData);
  $.ajax({
    type:'POST',
    url: 'https://api.imgur.com/3/image',
    data: formData,
    crossDomain: true,
    processData: false,
    contentType: false,
    headers: {
      Authorization: 'Client-ID ' + "276a9fab62145b0",
      Accept: 'application/json'
    },
    mimeType: 'multipart/form-data',
  })
  .then(response=>{
    response = JSON.parse(response);
    listing.image = response.data.link;
    updateListing(listing, oldListing, callback)
  })
  .catch(error=>{
    callback(error);
  })
  }
}

function updateListing(listing, oldListing, callback) {
  $.ajax({
    type:'PUT',
    url: `/listing/${oldListing._id}`,
    data: {
      title: listing.title,
      desc: listing.desc,
      loc: listing.loc,
      image: listing.image
    }
  })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    callback(error);
  })
}

export function givawayListingService(input, callback){
  console.log(input.receiver)
  $.post('/give', {
    receiver: input.receiver,
    listing: input.listing
  })
  // $.ajax({
  //   type: 'POST',
  //   url: '/give',
  //   data: {
  //     receiver: input.receiver,
  //     listing: input.listing
  //   }
  // })
  .then(response=>{
    callback(response);
  })
  .catch(error=>{
    console.log(error)
    callback(error);
  })
}