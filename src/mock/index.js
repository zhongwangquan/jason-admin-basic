import Mock from 'mockjs';

Mock.mock(
  '/user', {
    data: {
      'name': '@name',
      'email': '@email',
      'age|1-10': 5
    }
  }
)

Mock.mock(
  '/login', {
    data: {
      'token': '4646464646546'
    }
  }
)
