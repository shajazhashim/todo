from django.shortcuts import render
from django.shortcuts import redirect
from .models import TodoList
from .forms import TodoListForm
from django.views.decorators.http import require_POST
# Create your views here.


def index(request):
    todo_items = TodoList.objects.order_by('id')
    form = TodoListForm()
    context = {'todo_items': todo_items, 'form': form}
    return render(request, 'todolist/index.html', context)


@require_POST
def addTodoItem(request):
    form = TodoListForm(request.POST)
    if form.is_valid():
        new_todo = TodoList(text=request.POST['text'])
        new_todo.save()
    return redirect('index')

def completedTodo(request, todo_id):
    todo = TodoList.objects.get(pk=todo_id)
    todo.completed = True
    todo.save()
    return redirect('index')

def deleteCompleted(request):
    TodoList.objects.filter(completed__exact=True).delete()
    return redirect('index')

def deleteAll(request):
    TodoList.objects.all().delete()
    return redirect('index')

