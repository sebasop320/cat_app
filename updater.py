import requests
import tkinter.messagebox as messagebox


# Define the version as a variable so it updates automatically
Version = "Stable V1.O.1"
# Define the URL for the GitHub releases
GITHUB_RELEASES_URL = "https://github.com/sebasop320/cat_app/releases"

def check_updates():
    """
    Check for updates by fetching the latest release version from the GitHub API.
    If a newer version is available, display a message to the user.
    """


    # Fetch the latest release version from the GitHub API
    try:
        response = requests.get(GITHUB_RELEASES_URL)
        response.raise_for_status()
        latest_release = response.json()[0]
        latest_version = latest_release['stable_main']
    except (requests.RequestException, IndexError):
        return

    # Compare the latest version with the current version
    if latest_version != Version:
        update_message = f"A new version ({latest_version}) is available. Please update to the latest version."
        messagebox.showinfo("Update Available", update_message)
