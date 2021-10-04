import toastr from 'toastr';
import 'toastr/build/toastr.css';


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
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
    success() {
        toastr["info"]("Success. Your note is created")
    },

    error() {
        toastr["error"]("No notes were created. Please enter a title or content for the note!");
    }
}