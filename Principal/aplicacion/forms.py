from django import forms
from django.contrib.auth.models import User

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(), label='Contraseña')

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        widgets = {
            'email': forms.EmailInput(attrs={'placeholder': 'Correo electrónico'}),
            'username': forms.TextInput(attrs={'placeholder': 'Nombre de usuario'}),
        }
        
    def clean_password(self):
        password = self.cleaned_data.get('password')
        if len(password) < 8:
            raise forms.ValidationError('La contraseña debe tener al menos 8 caracteres.')
        return password
