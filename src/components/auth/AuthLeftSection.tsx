export const AuthLeftSection = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-12 items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-md">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent leading-tight">
          CallFlow
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          Experience premium voice calling with seamless authentication and enterprise-grade security.
        </p>
      </div>
    </div>
  );
};
