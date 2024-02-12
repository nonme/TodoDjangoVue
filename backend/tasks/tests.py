from django.test import TestCase
from django.contrib.auth.models import User
from .models import Task


class TaskModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_user = User.objects.create_user(
            username='testuser', password='12345')
        test_user.save()

        task = Task.objects.create(
            user=test_user,
            caption="Test Task",
            description="Test Description"
        )
        task.save()

    def test_task_content(self):
        task = Task.objects.get(id=1)
        expected_user = f'{task.user}'
        expected_caption = f'{task.caption}'
        expected_description = f'{task.description}'
        self.assertEqual(expected_user, 'testuser')
        self.assertEqual(expected_caption, 'Test Task')
        self.assertEqual(expected_description, 'Test Description')
