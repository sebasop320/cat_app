import requests
import tkinter as tk
import tkinter.messagebox as messagebox
import threading
import platform
import webbrowser
import io
import cv2
import numpy as np
from PIL import ImageTk, Image

# Define the API endpoint for fetching cat images
CAT_API_URL = "https://api.thecatapi.com/v1/images/search"

class CatApp:
    def __init__(self, window):
        self.window = window
        self.image_label = None
        self.refresh_button = None
        self.image_url = None
        self.image_cache = []

        # Create and configure the GUI elements
        self.create_menu()
        self.create_image_label()
        self.create_refresh_button()

        # Start fetching random cat images
        self.fetch_cat_image()

    def create_menu(self):
        menubar = tk.Menu(self.window)
        self.window.config(menu=menubar)

        file_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="Exit", command=self.window.quit)

        app_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="App", menu=app_menu)
        app_menu.add_command(label="Version", command=self.show_version)
        app_menu.add_command(label="Usage", command=self.show_usage)

    def create_image_label(self):
        self.image_label = tk.Label(self.window)
        self.image_label.pack()

    def create_refresh_button(self):
        self.refresh_button = tk.Button(
            self.window,
            text="Refresh",
            command=self.fetch_cat_image
        )
        self.refresh_button.pack()

    def fetch_cat_image(self):
        response = requests.get(CAT_API_URL)
        data = response.json()
        self.image_url = data[0]["url"]

        # Check image cache
        if self.image_url in self.image_cache:
            self.fetch_cat_image()
            return

        # Download the image and display it
        image_data = requests.get(self.image_url).content
        image = cv2.imdecode(
            np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR
        )
        image = cv2.resize(image, (400, 300))
        img = Image.fromarray(image)
        photo = ImageTk.PhotoImage(image=img)

        self.image_label.configure(image=photo)
        self.image_label.image = photo
        self.image_label.pack()

        # Add image URL to cache
        self.image_cache.append(self.image_url)

        # Schedule the next image fetch after 2 seconds
        self.window.after(2000, self.fetch_cat_image)

    def open_image_url(self):
        if self.image_url:
            webbrowser.open(self.image_url)

    def show_version(self):
        messagebox.showinfo("App Version", "Random Cat App v1.0")

    def show_usage(self):
        messagebox.showinfo("App Usage", "Click 'Refresh' to fetch a new random cat image.")

def run_app():
    window = tk.Tk()
    window.title("Random Cat")

    # Set the window size and position it at the center of the screen
    window.geometry("400x350")
    window.eval('tk::PlaceWindow . center')


    # Set the window icon
    window.iconbitmap("cat.png")  # Add this line with the path to your icon file

    app = CatApp(window)
    window.mainloop()


if __name__ == "__main__":
    # Check the platform to determine the appropriate way to run the app
    # macOS
    if platform.system() == "Darwin":
        run_app()
    # Windows
    elif platform.system() == "Windows":
        import ctypes
        ctypes.windll.shcore.SetProcessDpiAwareness(1)
        run_app()
    else:
        # Linux or other platforms
        print("This app is intended to run on macOS or Windows.")