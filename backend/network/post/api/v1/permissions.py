from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    message = 'Only the post owner can modify or delete.'

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user == request.user
