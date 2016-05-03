import ast

from rest_framework.serializers import Field


class CustomListField(Field):

    def to_representation(self, obj):
        if obj is None:
            return obj

        return obj

    def to_internal_value(self, data):
        if not data:
            data = []

        if isinstance(data, list):
            return data

        return ast.literal_eval(data)
