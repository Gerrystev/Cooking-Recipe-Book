import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsRecipeOnlinePage } from './details-recipe-online.page';

describe('DetailsRecipeOnlinePage', () => {
  let component: DetailsRecipeOnlinePage;
  let fixture: ComponentFixture<DetailsRecipeOnlinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRecipeOnlinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsRecipeOnlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
