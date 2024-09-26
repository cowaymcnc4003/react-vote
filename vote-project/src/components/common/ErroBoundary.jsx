import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 에러 상태로 전환
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 (예: 서버에 전송)
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생하면 사용자에게 보여줄 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
