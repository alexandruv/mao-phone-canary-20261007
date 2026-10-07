from pathlib import Path
import unittest


class PhoneFlowMarkerTest(unittest.TestCase):
    def test_exact_file_content(self):
        marker = Path(__file__).resolve().parent / "phone-flow-marker.txt"
        self.assertEqual(marker.read_bytes(), b"phone-flow-ok\n")


if __name__ == "__main__":
    unittest.main()
