import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

export class CallCenterToast extends Toast {
    // used for demo purposes
    undoString = 'undo';
  
    // constructor is only necessary when not using AoT
    constructor(
      protected override toastrService: ToastrService,
      public override toastPackage: ToastPackage,
    ) {
      super(toastrService, toastPackage);
    }
    override remove(): void {
        super.remove()
    }
    action(event: Event) {
      event.stopPropagation();
      this.undoString = 'undid';
      this.toastPackage.triggerAction();
      return false;
    }
  }