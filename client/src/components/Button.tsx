import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  rounded = 'lg',
  className = '',
  disabled,
  ...props
}) => {
  // 기본 클래스
  const classes = ['button'];
  
  // 변형 클래스 추가
  classes.push(`button-${variant}`);
  
  // 크기 클래스 추가
  classes.push(`button-${size}`);
  
  // 모서리 클래스 추가
  classes.push(`button-rounded-${rounded}`);
  
  // 너비 클래스 추가
  if (fullWidth) {
    classes.push('button-full-width');
  }
  
  // 비활성화 클래스 추가
  if (disabled || isLoading) {
    classes.push('button-disabled');
  }
  
  // 사용자 정의 클래스 추가
  if (className) {
    classes.push(className);
  }
  
  return (
    <button
      className={classes.join(' ')}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="button-spinner" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {leftIcon && <span className="button-left-icon">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="button-right-icon">{rightIcon}</span>}
    </button>
  );
};

export default Button; 