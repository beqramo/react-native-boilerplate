import DropdownAlert from 'react-native-dropdownalert';

type AlertType = 'info' | 'warn' | 'error' | 'success';

export type DropdownType = {
  alertWithType: (type: AlertType, title: string, message: string) => void;
};

export class DropDownHolder {
  static dropDown: DropdownType | null;

  static setDropDown(dropDown: DropdownAlert | null) {
    this.dropDown = dropDown;
  }

  static alert(type: AlertType, title: string, message = '') {
    this.dropDown?.alertWithType(type, title, message);
  }
}
