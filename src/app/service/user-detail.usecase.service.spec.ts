import { TestBed } from '@angular/core/testing';
import { UserDetailUsecase } from './user-detail.usecase';

describe('UserDetail.UsecaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDetailUsecase = TestBed.get(UserDetailUsecase);
    expect(service).toBeTruthy();
  });
});
