import toastr from 'toastr';
import 'toastr/build/toastr.css';


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export default {
    successRequest() {
        toastr["info"]("Success. You can see your notes")
    },

    fetchError() {
        toastr["error"]("Something went wrong. Please, try again!");
    }
}