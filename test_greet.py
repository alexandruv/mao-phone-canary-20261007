"""Tests for the greeting command."""

from pathlib import Path
import subprocess
import sys
import unittest


class GreetingTest(unittest.TestCase):
    def test_command_prints_greeting_and_exits_successfully(self):
        result = subprocess.run(
            [sys.executable, str(Path(__file__).with_name("greet.py"))],
            capture_output=True,
            text=True,
            check=False,
        )

        self.assertEqual(result.returncode, 0)
        self.assertEqual(result.stdout, "Hello from the Mac mini phone flow!\n")
        self.assertEqual(result.stderr, "")


if __name__ == "__main__":
    unittest.main()
