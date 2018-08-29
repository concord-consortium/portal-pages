export default function update_server(id, update_json) {
  console.log('update__server(id: ' + id + ', update_json: ' +
    JSON.stringify(update_json) + ')');
  jQuery.ajax({
    type: 'PUT',
    url: Portal.API_V1.external_activity(id),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(update_json),
    success: function (data) {},
    error: function (data) {
      console.log("update_server() - update failed")
      window.alert('Error changing a setting on an external activity\n' +
        JSON.stringify(data))
    }
  })
}