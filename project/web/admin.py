from django.contrib import admin

from web.models import Category, CategoryAnalysis, Analysis, UserProfile


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'content')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(CategoryAnalysis)
class CategoryAnalysisAdmin(admin.ModelAdmin):
    pass


@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):
    pass
