import {Component} from '@angular/core';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent {
  hunter1:boolean = false
  hunter2:boolean = false
  hunter3:boolean = false

  isShowing(event: MouseEvent) {
    let elementId: string = (event.target as Element).id;
    switch (elementId){
      case '1':
        this.hunter1 = !this.hunter1
        if(this.hunter1) {document.getElementById('1target')!.style.display = 'initial'} else  document.getElementById('1target')!.style.display ='none'
        break;
      case '2':
        this.hunter2 = !this.hunter2
        if(this.hunter2) {document.getElementById('2target')!.style.display = 'initial'} else  document.getElementById('2target')!.style.display ='none'
        break;
      case '3':
        this.hunter3 = !this.hunter3
        if(this.hunter3) {document.getElementById('3target')!.style.display = 'initial'} else  document.getElementById('3target')!.style.display ='none'
    }
  }
}
