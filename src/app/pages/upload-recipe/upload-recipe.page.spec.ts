import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadRecipePage } from './upload-recipe.page';

describe('UploadRecipePage', () => {
  let component: UploadRecipePage;
  let fixture: ComponentFixture<UploadRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
