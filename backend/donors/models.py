from django.db import models


class Donor(models.Model):

    BLOOD_GROUP_CHOICES = [
        # A group
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('A1+', 'A1+'),
        ('A1-', 'A1-'),
        ('A2+', 'A2+'),
        ('A2-', 'A2-'),
        ('A1B+', 'A1B+'),
        ('A1B-', 'A1B-'),
        ('A2B+', 'A2B+'),
        ('A2B-', 'A2B-'),

        # B group
        ('B+', 'B+'),
        ('B-', 'B-'),

        # O group
        ('O+', 'O+'),
        ('O-', 'O-'),

        # AB group
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),

        # Bombay blood group
        ('Oh+', 'Oh+ (Bombay)'),
        ('Oh-', 'Oh- (Bombay)'),
    ]

    name = models.CharField(max_length=100)

    blood_group = models.CharField(
        max_length=5,
        choices=BLOOD_GROUP_CHOICES
    )

    phone = models.CharField(max_length=15)

    email = models.EmailField(blank=True)

    location = models.CharField(max_length=100)

    available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.blood_group}"


class BloodRequest(models.Model):

    BLOOD_GROUP_CHOICES = [
        # A group
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('A1+', 'A1+'),
        ('A1-', 'A1-'),
        ('A2+', 'A2+'),
        ('A2-', 'A2-'),
        ('A1B+', 'A1B+'),
        ('A1B-', 'A1B-'),
        ('A2B+', 'A2B+'),
        ('A2B-', 'A2B-'),

        # B group
        ('B+', 'B+'),
        ('B-', 'B-'),

        # O group
        ('O+', 'O+'),
        ('O-', 'O-'),

        # AB group
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),

        # Bombay blood group
        ('Oh+', 'Oh+ (Bombay)'),
        ('Oh-', 'Oh- (Bombay)'),
    ]

    name = models.CharField(max_length=100)

    blood_group = models.CharField(
        max_length=5,
        choices=BLOOD_GROUP_CHOICES
    )

    location = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    hospital = models.CharField(max_length=150)

    units_required = models.PositiveIntegerField(default=1)

    urgent = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.blood_group} - {self.location}"