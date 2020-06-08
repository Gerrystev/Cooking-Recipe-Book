import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DownloadedRecipesPage } from './downloaded-recipes.page';

describe('DownloadedRecipesPage', () => {
  let component: DownloadedRecipesPage;
  let fixture: ComponentFixture<DownloadedRecipesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadedRecipesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadedRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
