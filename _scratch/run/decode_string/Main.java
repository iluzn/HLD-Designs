import java.util.*;

class Solution {
    public String decodeString(String s) {
        Deque<String> strs = new ArrayDeque<>();
        Deque<Integer> nums = new ArrayDeque<>();
        StringBuilder cur = new StringBuilder();
        int num = 0;
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) num = num * 10 + (c - '0');
            else if (c == '[') { strs.push(cur.toString()); nums.push(num); cur = new StringBuilder(); num = 0; }
            else if (c == ']') {
                int k = nums.pop();
                StringBuilder tmp = new StringBuilder(strs.pop());
                for (int i = 0; i < k; i++) tmp.append(cur);
                cur = tmp;
            } else cur.append(c);
        }
        return cur.toString();
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().decodeString(s)).append("\n");}System.out.print(sb);}}