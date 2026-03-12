

        const form = document.getElementById('registerForm');
        const successMessage = document.getElementById('successMessage');
        
        // Validation rules
        const validators = {
            fullName: (value) => {
                if (!value.trim()) return 'Họ và tên không được trống';
                if (value.trim().length < 3) return 'Họ và tên phải có ít nhất 3 ký tự';
                if (!/^[a-zA-ZÀ-ỿ\s]+$/.test(value)) return 'Họ và tên chỉ chứa chữ cái và khoảng trắng';
                return '';
            },
            email: (value) => {
                if (!value.trim()) return 'Email không được trống';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email không đúng định dạng';
                return '';
            },
            phone: (value) => {
                if (!value.trim()) return 'Số điện thoại không được trống';
                if (!/^0\d{9}$/.test(value)) return 'Số điện thoại phải là 10 chữ số và bắt đầu bằng 0';
                return '';
            },
            password: (value) => {
                if (!value) return 'Mật khẩu không được trống';
                if (value.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự';
                if (!/[A-Z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ hoa';
                if (!/[a-z]/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ thường';
                if (!/\d/.test(value)) return 'Mật khẩu phải có ít nhất 1 chữ số';
                return '';
            },
            confirmPassword: (value) => {
                const password = document.getElementById('password').value;
                if (!value) return 'Xác nhận mật khẩu không được trống';
                if (value !== password) return 'Mật khẩu không khớp';
                return '';
            },
            gender: () => {
                const checked = document.querySelector('input[name="gender"]:checked');
                return checked ? '' : 'Vui lòng chọn giới tính';
            },
            terms: () => {
                return document.getElementById('terms').checked ? '' : 'Bạn phải đồng ý với điều khoản';
            }
        };
            function showError(field, message){
                const errorElement = document.getElementById(field.id + 'Error');

                field.classList.add('invalid');
                errorElement.textContent = message;
                errorElement.classList.add('show');
        }

            function clearError(field){
                const errorElement = document.getElementById(field.id + 'Error');

                field.classList.remove('invalid');
                errorElement.classList.remove('show');
        }
        // Validate single field
        const validateField = (fieldName) => {
            const field = document.getElementById(fieldName);
            const error = validators[fieldName](field.value);

        if (error) {
            showError(field, error);
            return false;
        } else {
            clearError(field);
            return true;
        }
        };
        
        // Validate special fields
        const validateSpecialField = (fieldName) => {
            const errorElement = document.getElementById(fieldName + 'Error');
            const error = validators[fieldName]();
            
            if (error) {
                errorElement.textContent = error;
                errorElement.classList.add('show');
                return false;
            } else {
                errorElement.classList.remove('show');
                return true;
            }
        };
        
        // Add real-time validation
        ['fullName', 'email', 'phone', 'password', 'confirmPassword'].forEach(fieldName => {
            document.getElementById(fieldName).addEventListener('blur', () => {
                validateField(fieldName);
            });
        });
        
        // Form submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            successMessage.style.display = 'none';
            
            const isValid = 
                validateField('fullName') &
                validateField('email') &
                validateField('phone') &
                validateField('password') &
                validateField('confirmPassword') &
                validateSpecialField('gender') &
                validateSpecialField('terms');
            
            if (isValid) {
                successMessage.style.display = 'block';
                form.reset();
                
                // Clear all error classes
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('invalid');
                });
            }
        });
