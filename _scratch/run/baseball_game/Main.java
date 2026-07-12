import java.util.*;

class Solution {
    public int calPoints(String s) {
        Deque<Integer> st = new ArrayDeque<>();
        for (String tok : s.trim().split("\\s+")) {
            if (tok.equals("C")) st.pop();
            else if (tok.equals("D")) st.push(2 * st.peek());
            else if (tok.equals("+")) { int a = st.pop(); int b = a + st.peek(); st.push(a); st.push(b); }
            else st.push(Integer.parseInt(tok));
        }
        int sum = 0;
        for (int x : st) sum += x;
        return sum;
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().calPoints(s)).append("\n");}System.out.print(sb);}}